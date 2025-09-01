import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, UserCheck, X } from "lucide-react";
import Link from "next/link";

interface Application {
  id: string;
  status: string;
  match_score: number | null;
  created_at: string;
  applicants: {
    company_name: string | null;
    industry: string | null;
    team_size: number | null;
  } | null;
}

interface DataTableProps {
  applications: Application[];
}

export function ApplicationsDataTable({ applications }: DataTableProps) {
  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-500";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Industry & Size</TableHead>
            <TableHead>Match Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {application.applicants?.company_name || "Unknown Company"}
                  </div>
                  <div className="text-sm text-gray-500">
                    #{application.id.slice(0, 8)}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-sm">
                    {application.applicants?.industry || "Not specified"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.applicants?.team_size
                      ? `${application.applicants.team_size} employees`
                      : "Size not specified"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`font-medium ${getScoreColor(application.match_score)}`}>
                  {application.match_score ? `${application.match_score}/100` : "Pending"}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={application.status as any}>
                  {application.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(application.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Link href={`/admin/applications/${application.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  {application.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
