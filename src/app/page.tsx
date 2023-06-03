'use client';
import { useAppSelector } from "@/redux/selector"
import { useDispatch } from "react-redux";
import { increment } from "@/redux/features/counter/counter-slice";

export default function Home() {
  const Count = useAppSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  function handleCounterClick() {
    dispatch(increment());
  }

  return (
    <main className="flex min-h-screen justify-center bg-zinc-800">
      <div className="self-center">
        <p className="text-white text-xl" >
          Olá! Pedro.
        </p>

        <button
          className="text-white text-base bg-zinc-700 p-2 rounded-xl"
          onClick={handleCounterClick}
        >
          Counter: {Count}
        </button>
      </div>
    </main>
  )
}
