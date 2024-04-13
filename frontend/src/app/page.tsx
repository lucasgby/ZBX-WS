import { Login } from "../components";

export default function Home() {
  return (
    <div className="h-screen w-screen p-8">

      <div className="rounded-[32px] p-[14px] h-full w-full bg-white shadow-xl">
        <Login />
      </div>

    </div>
  );
}
