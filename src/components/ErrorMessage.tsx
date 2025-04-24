import { ReactNode } from "react";


export default function ErrorMessage({children} : {children: ReactNode}) {
  return (
    <div className="text-center my-4 bg-red-300 text-red-600 font-bold p-3 uppercase text-sm">
      {children}
    </div>
  )
}
