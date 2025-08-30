interface DataHeaderProps {
    total: number;
    active: number;
  }
  
  export default function DataHeader({ total, active }: DataHeaderProps) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
        <p className="text-gray-600 mt-2">Manage users and their information</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-sm text-gray-600">
            Total Users: <span className="font-semibold">{total}</span>
          </div>
          <div className="text-sm text-gray-600">
            Active: <span className="font-semibold">{active}</span>
          </div>
        </div>
      </div>
    );
  }
  