
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { getAllSubscribers, exportSubscribersAsCSV } from "@/data/subscribers";

const Admin = () => {
  const subscribers = getAllSubscribers();

  const handleDownloadCSV = () => {
    const csv = exportSubscribersAsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'newsletter_subscribers.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleDownloadCSV} className="flex items-center gap-2">
            <Download size={16} /> Download CSV
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Total subscribers: {subscribers.length}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-beige-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date Subscribed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {subscriber.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {subscriber.createdAt.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-muted-foreground">
                      No subscribers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-medium text-amber-800 mb-2">Note:</h3>
          <p className="text-amber-700">
            This is a demonstration of storing newsletter subscribers in memory. In a production environment, this data would be stored in a proper database with appropriate security measures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
