interface StatusBadgeProps {
  status: "New" | "Contacted" | "Qualified" | "Unqualified";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colorMap = {
    New: "bg-blue-500 text-blue-100",
    Contacted: "bg-yellow-500 text-yellow-100",
    Qualified: "bg-green-500 text-green-100",
    Unqualified: "bg-red-500 text-red-100",
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorMap[status] || "bg-gray-500 text-gray-100"}`}>
      {status}
    </span>
  );
};
