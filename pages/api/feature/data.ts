/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/features/lib/db';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs';
import { PaginatedAPIResponseBackend, APIResponse, User } from '@/types/def';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

// Function Handler for GET, POST, PUT, DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse<PaginatedAPIResponseBackend<User> | APIResponse<User>>) {
  // Middleware JWT Authentication
  authenticateToken(req as AuthenticatedRequest, res, async () => {
    try {
      const db = await connectDB();
      const { id, term } = req.query;

      // Handle GET request (Get by ID, Paginated List, or Search by Term)
      if (req.method === 'GET') {
        if (id) {
          if (!/^\d+$/.test(id as string)) {
            return res.status(400).json({
              status: false,
              code: "400",
              message: "Invalid User ID. ID must be a numeric value.",
              data: null,
            });
          }

          const [rows] = await db.execute<User[] & RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [Number(id)]);

          if (rows.length === 0) {
            return res.status(404).json({
              status: false,
              code: "404",
              message: "User not found.",
              data: null,
            });
          }

          return res.status(200).json({
            status: true,
            code: "200",
            message: "Success get user by ID.",
            data: rows[0],
          });
        }

        const page = parseInt(req.query.page as string, 10) || 1;
        const page_size = parseInt(req.query.page_size as string, 10) || 25;
        const validatedPage = page < 1 ? 1 : page;
        const validatedPageSize = page_size < 1 || page_size > 100 ? 25 : page_size;
        const offset = (validatedPage - 1) * validatedPageSize;

        // 🔥 Cek apakah `term` diberikan
        let searchCondition = "";
        let searchParams: string[] = [];

        if (term && typeof term === "string") {
          searchCondition = `
            WHERE name LIKE ? OR 
                  email LIKE ? OR
                  role_id LIKE ?
          `;
          searchParams = [`%${term}%`, `%${term}%`, `%${term}%`];
        }

        // 🔥 Query untuk mendapatkan total data
        const [[totalDataRow]] = await db.execute<RowDataPacket[]>(
          `SELECT COUNT(*) AS total_data FROM users ${searchCondition}`,
          searchParams
        );
        const total_data: number = totalDataRow?.total_data || 0;

        // 🔥 Query untuk mendapatkan data dengan pencarian & pagination
        const [rows] = await db.execute<User[] & RowDataPacket[]>(
          `SELECT * FROM users ${searchCondition} LIMIT ? OFFSET ?`,
          [...searchParams, validatedPageSize.toString(), offset.toString()]
        );

        const total_page = Math.max(Math.ceil(total_data / validatedPageSize), 1);

        return res.status(200).json({
          status: true,
          code: "200",
          message: "Success get users.",
          data: {
            items: rows,
            pagination: {
              page: validatedPage,
              page_size: validatedPageSize,
              total_page,
              total_data,
              current_page: rows.length > 0 ? validatedPage : 0,
              current_data: rows.length,
            },
          },
        });
      }

      // Handle POST request (Create New User)
if (req.method === 'POST') {
    const { name, email, password, role_id, status } = req.body;
  
    if (!name || !email || !password || !role_id || !status) {
      return res.status(400).json({
        status: false,
        code: "400",
        message: "All fields (name, email, password, role_id, status) are required.",
        data: null,
      });
    }
  
    if (!/^\d+$/.test(role_id.toString())) {
      return res.status(400).json({
        status: false,
        code: "400",
        message: "Invalid role_id. It must be a numeric value.",
        data: null,
      });
    }
  
    // Check if email already exists
    const [existingUsers] = await db.execute<User[] & RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: false,
        code: "400",
        message: "Email already exists.",
        data: null,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await db.execute(
      'INSERT INTO users (name, email, password, role_id, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, Number(role_id), status]
    );
  
    return res.status(201).json({
      status: true,
      code: "201",
      message: "User created successfully.",
      data: null,
    });
  }
  

      // Handle PUT request (Update User by ID)
      if (req.method === 'PUT') {
        if (!id || !/^\d+$/.test(id as string)) {
          return res.status(400).json({
            status: false,
            code: "400",
            message: "Valid User ID is required for update.",
            data: null,
          });
        }

        const { name, email, password, role_id, status } = req.body;

        if (!name && !email && !password && !role_id) {
          return res.status(400).json({
            status: false,
            code: "400",
            message: "At least one field (name, email, password, role_id,status) is required for update.",
            data: null,
          });
        }

        const updateFields = [];
        const updateValues = [];

        if (name) updateFields.push("name = ?"), updateValues.push(name);
        if (email) updateFields.push("email = ?"), updateValues.push(email);
        if (password) updateFields.push("password = ?"), updateValues.push(await bcrypt.hash(password, 10));
        if (role_id) updateFields.push("role_id = ?"), updateValues.push(Number(role_id));
        if (status) updateFields.push("status = ?"), updateValues.push(status);


        updateValues.push(Number(id));

        const [result] = await db.execute(`UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`, updateValues);

        if ((result as any).affectedRows === 0) {
          return res.status(404).json({
            status: false,
            code: "404",
            message: "User not found or no changes made.",
            data: null,
          });
        }

        return res.status(200).json({
          status: true,
          code: "200",
          message: "User updated successfully.",
          data: null,
        });
      }

      // Handle DELETE request (Delete User by ID)
      if (req.method === 'DELETE') {
        if (!id || !/^\d+$/.test(id as string)) {
          return res.status(400).json({
            status: false,
            code: "400",
            message: "Valid User ID is required for deletion.",
            data: null,
          });
        }

        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [Number(id)]);

        if ((result as any).affectedRows === 0) {
          return res.status(404).json({
            status: false,
            code: "404",
            message: "User not found or already deleted.",
            data: null,
          });
        }

        return res.status(200).json({
          status: true,
          code: "200",
          message: "User deleted successfully.",
          data: null,
        });
      }

      return res.status(405).json({
        status: false,
        code: "405",
        message: "Method Not Allowed.",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        code: "500",
        message: `Internal Server Error, ${error instanceof Error ? error.message : String(error)}`,
        data: null,
      });
    }
  });
}
