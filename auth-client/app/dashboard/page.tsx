"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const o = localStorage.getItem("organization");

    if (u) setUser(JSON.parse(u));
    if (o) setOrg(JSON.parse(o));
  }, []);

  if (!user) {
    return <p className="p-6">Not logged in</p>;
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <section className="border rounded p-4">
        <h2 className="font-medium">User</h2>
        <p>Email: {user.email}</p>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Role: {user.roleName}</p>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium">Organization</h2>
        {org ? (
          <>
            <p>Name: {org.name}</p>
            <p>Slug: {org.slug}</p>
          </>
        ) : (
          <p>No organization assigned</p>
        )}
      </section>
    </main>
  );
}
