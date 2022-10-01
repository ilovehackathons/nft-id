import { useSession, signIn, signOut } from "next-auth/react";
function TwitterCard({
  description,
  // profile_image_url,
  name,
  username,
  location,
  id,
  verified,
  url,
  public_metrics,
  // protected
  created_at,
  ...props
}) {
  const profile_image_url = props.profile_image_url?.replace(/_normal/g, "");

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl border-2 border-indigo-600">
      <figure>
        <img src={profile_image_url} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>@{username}</p>
        <p className="mt-3">{description}</p>
        <div className="card-actions justify-end">
          <button className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ...">
            Mint now
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Component() {
  const { data: session } = useSession() as any;
  if (session) {
    return (
      <>
        Signed in as {session.user.image.username ?? session.user.name}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.user.image.username && <TwitterCard {...session.user.image} />}
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
