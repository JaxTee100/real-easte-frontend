'use client'

import React, {useEffect, useState} from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useHouseStore } from '@/store/useHouseStore'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from "sonner";

const ListCard = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");
    const [realEstateTypes, setRealEstateTypes] = useState({
      houses: false,
      condos: false,
      apartments: true,
      commercial: false,
    });
    const [selectedRooms, setSelectedRooms] = useState(2);
    const [bathroomType, setBathroomType] = useState("any");
 const {
     houses,
     isLoading,
     error,
     fetchClientHouses,
     currentPage,
     totalPages,
     setCurrentPage
   } = useHouseStore();
  const router = useRouter();

   const fetchAllHousesClientView = () => {
      fetchClientHouses({
        page: currentPage,
        limit: 5,
        rooms: selectedRooms,
        bathroomType,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sortBy,
        sortOrder,
        estateTypes: Object.keys(realEstateTypes).filter(type => realEstateTypes[type])
      });
    };
  
    useEffect(() => {
  
  
      fetchAllHousesClientView();
      console.log("houses", houses)
    }, [
      currentPage,
      priceRange,
      sortBy,
      sortOrder,
      selectedRooms,
      realEstateTypes,
      bathroomType
    ]);

  async function handleDeleteHouse(id) {
    if (window.confirm("Are you sure you want to delete this house?")) {
      const result = await deleteHouse(id);
      if (result) {
        toast({
          title: "House deleted successfully",
        });
        fetchClientHouses();
      }
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="p-4">House</th>
            <th className="p-4">Price</th>
            <th className="p-4">Rooms</th>
            <th className="p-4">Floors</th>
            <th className="p-4">Bathrooms</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house, index) => (
            <motion.tr
              key={house.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* House Image + Address */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-14 rounded overflow-hidden bg-gray-100 border border-gray-300">
                    <Image
                      src={house.images[0].url}
                      alt="House Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {house.address}
                    </p>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="p-4 text-sm text-gray-700">${house.price}</td>

              {/* Rooms */}
              <td className="p-4 text-sm text-gray-700">{house.rooms}</td>

              {/* Floors */}
              <td className="p-4 text-sm text-gray-700">{house.floors}</td>

              {/* Bathrooms */}
              <td className="p-4 text-sm text-gray-700">{house.bathrooms}</td>

              {/* Actions */}
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => router.push(`/houses/add?id=${house.id}`)}
                    variant="ghost"
                    size="icon"
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteHouse(house.id)}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListCard
