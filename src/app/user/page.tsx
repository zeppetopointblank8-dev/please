'use client'
import dynamic from "next/dynamic";

// Dynamically import the component with no server-side rendering
const UserNoSSR = dynamic(() => import("@/features/page/user"), {
  ssr: false,
});

// Assign the component to a variable with a name
const UserPage = () => <UserNoSSR />;

// Optionally, add a displayName for debugging purposes
UserPage.displayName = "UserPage";

// Export the named component as the default export
export default UserPage;
