import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function LandingPage(): JSX.Element {
  // Data for the image cards to enable mapping
  const imageCards = [
    {
      id: 1,
      alt: "Family scene with adults and child drawing together",
      src: "./public/",
    },
    {
      id: 2,
      alt: "Woman with baby in meditative pose with floral elements",
      src: "",
    },
    { id: 3, alt: "Woman in yellow with children hugging her", src: "" },
    { id: 4, alt: "Woman with curly hair in yellow dress", src: "" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1512px] h-[982px] relative">
        {/* Colorful background blurs */}
        <div className="absolute w-full h-[456px] top-[513px] left-0 right-0">
          <div className="w-[663px] top-0 left-0 bg-[#ffe3e8] absolute h-[417px] rounded-[80px] blur-[150px]" />
          <div className="w-[663px] top-[18px] left-[397px] bg-[#fffdd7] absolute h-[417px] rounded-[80px] blur-[150px]" />
          <div className="w-[663px] top-[39px] left-[831px] bg-[#d2f2ef] absolute h-[417px] rounded-[80px] blur-[150px]" />
          <div className="w-[332px] top-[39px] left-[1290px] bg-[#cbffd2] absolute h-[417px] rounded-[80px] blur-[150px]" />

          {/* Search bar */}
          <div className="absolute w-[989px] h-[83px] top-[172px] left-1/2 -translate-x-1/2 bg-[#d9d9d9] rounded-[65px] flex items-center px-12">
            <Search className="w-[50px] h-[50px] text-black/60 mr-[50px]" />
            <Input
              className="border-none bg-transparent shadow-none text-4xl h-auto py-5 [font-family:'Itim-Regular',Helvetica] font-normal text-[#000000a6] placeholder:text-[#000000a6] focus-visible:ring-0"
              placeholder="What are your concerns?"
            />
          </div>
        </div>

        {/* Image cards */}
        <div className="flex justify-between gap-4 absolute top-[41px] left-[18px] right-[18px]">
          {imageCards.map((image) => (
            <Card
              key={image.id}
              className="border-none shadow-none bg-transparent"
            >
              <CardContent className="p-0">
                <img
                  className="w-[361px] h-[331px] object-cover rounded-lg"
                  alt={image.alt}
                  src={image.src}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}