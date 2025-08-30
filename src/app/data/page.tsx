'use client'
import dynamic from "next/dynamic";

// Dynamically import the component with no server-side rendering
const DataNoSSR = dynamic(() => import("@/features/page/data"), {
  ssr: false,
});

// Assign the component to a variable with a name
const DataPage = () => <DataNoSSR />;

// Optionally, add a displayName for debugging purposes
DataPage.displayName = "DataPage";

// Export the named component as the default export
export default DataPage;
