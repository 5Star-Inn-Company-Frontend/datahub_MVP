"use client"
import { TableCell, TableRow } from "@/components/ui/table";
import { ViewLayout } from "../global/viewLayout";
import { TableLayout } from "../global/tableLayout";

interface ApiResponse {
  id: number;
  user_id?: number;
  title?: string;
  amount: number;
  name?: string;
  charges: number;
  commission: number;
  reference: string;
  recipient: string;
  status: number;
  type: string | null;
  remark: string;
  token: string | null;
  prev_balance: string;
  new_balance: string;
  server: number;
  server_response: string;
  created_at: string;
  updated_at: string;
}

interface MyApiInterResponse {
  data: ApiResponse[];
}

 export const All_Users = () => {
  const Apidata: MyApiInterResponse = {
    data: [
      {
        id: 1,
        // user_id: 1,
        name: "Stephen Adeyemo",
        amount: 300,
        charges: 0,
        commission: 3,
        reference: "1012647157",
        recipient: "08166939205",
        status: 1,
        type: "debit",
        remark: "Successful",
        token: null,
        prev_balance: "0",
        new_balance: "0",
        server: 0,
        server_response: "{'status':'success'}",
        created_at: "2024-01-03T17:18:45.000000Z",
        updated_at: "2024-01-05T20:56:40.000000Z",
      },
    ],
  };
  return (
    <ViewLayout navs={["All Users"]}>
      <TableLayout
        tableHeadRow={[
          "S/N",
          "Id",
          "name",
          "Amount",
          "Charges",
          "Commision",
          "Reference",
          "Recepient",
          "Status",
          "Type",
          "Remark",
          "Token",
          "Previous Balance",
          "New Balance",
          "Server",
          "Server Response",
        ]}
        caption={"A List of all "}
        // handleChange={handleChange}
        // handleSearch={handleSearch}
      >
        {Apidata?.data.map((info, index) => {
          const {
            
            id,
            name,
            amount,
            charges,
            commission,
            reference,
            recipient,
            status,
            type,
            remark,
            token,
            prev_balance,
            server,
            server_response,
            created_at,
            updated_at,
          } = info;
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              {[
                
                id,
                name,
                amount,
                charges,
                commission,
                reference,
                recipient,
                status,
                type,
                remark,
                token,
                prev_balance,
                server,
                //    (JSON.parse(server_response))?.status,
              ].map((bodyInfo, index) => (
                <TableCell key={index}>{bodyInfo}</TableCell>
              ))}
              <TableCell>{new Date(created_at).toLocaleString()}</TableCell>
              <TableCell>{new Date(updated_at).toLocaleString()}</TableCell>
            </TableRow>
          );
        })}
      </TableLayout>
    </ViewLayout>
  );
};

