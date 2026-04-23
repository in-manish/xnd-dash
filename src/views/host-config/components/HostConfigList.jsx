import React, { useState } from 'react';
import HostRow from './HostRow';
import HostPagination from './HostPagination';

const ITEMS_PER_PAGE = 12;

const HostConfigList = ({ hosts, onEdit, onOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(hosts.length / ITEMS_PER_PAGE));

  const currentHosts = hosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[hsl(var(--foreground)/0.08)] bg-[hsl(var(--background)/0.75)]">
              <th className="py-5 px-8 text-[12px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.12em]">
                Brand Asset
              </th>
              <th className="py-5 px-8 text-[12px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.12em]">
                Endpoint & Tags
              </th>
              <th className="py-5 px-8 text-[12px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.12em]">
                Status
              </th>
              <th className="py-5 px-8 text-[12px] font-bold text-[hsl(var(--foreground)/0.5)] uppercase tracking-[0.12em] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentHosts.map((host) => (
              <HostRow key={host.id} host={host} onOpen={onOpen} onEdit={onEdit} />
            ))}
          </tbody>
        </table>
      </div>

      <HostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default HostConfigList;
