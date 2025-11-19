"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Patient, PatientStatus, ContactMethod } from "@/app/types/dashboard";
import { MoreHorizontal, Phone, MessageSquare, Mail } from 'lucide-react';

// Composant pour l'indicateur de statut (point de couleur + texte)
const StatusIndicator = ({ status }: { status: PatientStatus }) => {
  const statusConfig = {
    "Discharged": { color: "bg-green-500", text: "text-green-800" },
    "Report Pending": { color: "bg-blue-500", text: "text-blue-800" },
    "ICU": { color: "bg-purple-500", text: "text-purple-800" },
    "In Recovery": { color: "bg-teal-500", text: "text-teal-800" },
    "Life Support": { color: "bg-red-500", text: "text-red-800" },
  };

  return (
    <div className="flex items-center">
      <span className={`h-2 w-2 rounded-full mr-2 ${statusConfig[status].color}`}></span>
      <span className="text-sm text-gray-700">{status}</span>
    </div>
  );
};

// Icônes de contact
const ContactIcon = ({ method }: { method: ContactMethod }) => {
  const icons = {
    phone: <Phone size={20} />,
    chat: <MessageSquare size={20} />,
    email: <Mail size={20} />,
  };
  return <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">{icons[method]}</button>
}

export default function PatientTable({ patients }: { patients: Patient[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50 border-b-0">
            <TableHead className="text-gray-500 font-medium">ADMITTED</TableHead>
            <TableHead className="text-gray-500 font-medium">PATIENT</TableHead>
            <TableHead className="text-gray-500 font-medium">ROOM</TableHead>
            <TableHead className="text-gray-500 font-medium">AREA OF CONCERN</TableHead>
            <TableHead className="text-gray-500 font-medium">IN CHARGE</TableHead>
            <TableHead className="text-gray-500 font-medium">STATUS</TableHead>
            <TableHead className="text-gray-500 font-medium">CONTACT</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow 
              key={patient.id} 
              className={`border-gray-200 ${patient.name === 'Marvin McKinney' && patient.room === 'DMK502' ? 'bg-indigo-50' : ''}`}
            >
              <TableCell className="text-gray-600 text-sm">{patient.admittedDate}</TableCell>
              <TableCell className="font-semibold text-gray-800">{patient.name}</TableCell>
              <TableCell className="text-gray-600 text-sm">{patient.room}</TableCell>
              <TableCell className="text-gray-800">{patient.areaOfConcern}</TableCell>
              <TableCell className="text-gray-800">{patient.inCharge}</TableCell>
              <TableCell><StatusIndicator status={patient.status} /></TableCell>
              <TableCell>
                <div className="flex items-center">
                   <ContactIcon method={patient.contactMethod} />
                </div>
              </TableCell>
              <TableCell>
                 <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={20} />
                  </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4 border-t border-gray-200">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">4</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">5</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink href="#">10</PaginationLink></PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Page</span>
           <Select defaultValue="2">
              <SelectTrigger className="w-16 h-8">
                <SelectValue placeholder="2" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          <span>of 34</span>
        </div>
      </div>
    </div>
  );
}