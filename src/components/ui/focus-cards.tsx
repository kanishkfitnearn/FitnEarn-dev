// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import { cn } from "@/lib/utils";

// export const Card = React.memo(
//   ({
//     card,
//     index,
//     hovered,
//     setHovered,
//   }: {
//     card: any;
//     index: number;
//     hovered: number | null;
//     setHovered: React.Dispatch<React.SetStateAction<number | null>>;
//   }) => (
//     <div
//       onMouseEnter={() => setHovered(index)}
//       onMouseLeave={() => setHovered(null)}
//       className={cn(
//         "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
//         hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
//       )}
//     >
//       <Image
//         src={card.src}
//         alt={card.title}
//         fill
//         className="absolute inset-0 object-cover"
//       />
//       <div
//         className={cn(
//           "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
//           hovered === index ? "opacity-100" : "opacity-0"
//         )}
//       >
//         <div className="text-xl font-medium text-transparent md:text-2xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-200">
//           {card.title}
//         </div>
//       </div>
//     </div>
//   )
// );

// Card.displayName = "Card";

// type Card = {
//   title: string;
//   src: string;
// };

// export function FocusCards({ cards }: { cards: Card[] }) {
//   const [hovered, setHovered] = useState<number | null>(null);

//   return (
//     <div className="grid w-full max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-3 md:px-8">
//       {cards.map((card, index) => (
//         <Card
//           key={card.title}
//           card={card}
//           index={index}
//           hovered={hovered}
//           setHovered={setHovered}
//         />
//       ))}
//     </div>
//   );
// }
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Card = {
  title: string
  src: string
  subtitle: string
}

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="absolute inset-0 object-cover"
      />
      <div
        className={cn(
          'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className='flex flex-col gap-1 mt-5'>
        <div className="text-xl font-medium text-transparent md:text-2xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
          
        </div>
        <div className="text-xl font-medium text-transparent md:text-xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.subtitle}
        </div>
        </div>
      </div>
    </div>
  )
)

Card.displayName = 'Card'

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const cardsPerPage = 6
  const totalPages = Math.ceil(cards.length / cardsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const displayedCards = cards.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  )

  return (
    <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
       <div           style={{ transform: `translateX(-${currentPage }%)` }}
 className="grid w-full max-w-5xl grid-cols-1 gap-10 mx-auto transition-transform duration-1000 ease-in-out md:grid-cols-3 md:px-8">
        {displayedCards.map((card, index) => (
          <Card
            key={`${card.title}-${index}`}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
      <div className="flex justify-end pt-5 space-x-2 pr-36 mq450:pr-0">
        <Button
          variant="outline"
          size="icon"
          onClick={prevPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}