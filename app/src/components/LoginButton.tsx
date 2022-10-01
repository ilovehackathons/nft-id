import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession() as any;
  if (session) {
    return (
      <>
        Signed in as {session.user.image.username ?? session.user.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
