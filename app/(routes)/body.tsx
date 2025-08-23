import Image from "next/image";

const Body = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="w-10/12  bg-cover">
            <Image src={'/jpg/Designer.jpeg'} alt="p-1" height={100} width={100} className="w-full rounded-2xl"/>

            </div>
        </div>
      );
}
 
export default Body;