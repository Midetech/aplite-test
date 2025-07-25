import { vendorList } from "@/constants/data";
import type { Vendor } from "@/types/vendor";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import EmptyState from "./EmptyState";
import SearchAndFilter from "./SearchAndFilter";
import { VendorCard } from "./VendorCard";

export const VendorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(""); // For debounced input
  const [selectedIndustry, setSelectedIndustry] =
    useState<string>("all industries");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [pendingOnly, setPendingOnly] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchVendors = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVendors(vendorList);
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    setLoading(true);
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(inputValue);
      setLoading(false);
    }, 1000);
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor: Vendor) => {
      const matchesSearch = vendor.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "all industries" ||
        vendor.industry === selectedIndustry;
      const matchesVerification =
        !verifiedOnly || vendor.verificationStatus === "verified";
      const matchesPending =
        !pendingOnly || vendor.verificationStatus === "pending";

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesVerification &&
        matchesPending
      );
    });
  }, [searchTerm, selectedIndustry, verifiedOnly, pendingOnly, vendors]);

  const clearFilters = () => {
    setInputValue("");
    setSearchTerm("");
    setSelectedIndustry("all industries");
    setVerifiedOnly(false);
    setPendingOnly(false);
  };

  const hasActiveFilters =
    inputValue ||
    selectedIndustry !== "all industries" ||
    verifiedOnly ||
    pendingOnly;

  return (
    <div className="w-full p-2 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vendor Directory
        </h1>
        <p className="text-muted-foreground">
          Find and connect with verified business partners
        </p>
      </div>

      {/* Search and Filter Controls */}
      <SearchAndFilter
        searchTerm={inputValue}
        setSearchTerm={setInputValue}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        verifiedOnly={verifiedOnly}
        setVerifiedOnly={setVerifiedOnly}
        filteredVendors={filteredVendors}
        vendors={vendors}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        pendingOnly={pendingOnly}
        setPendingOnly={setPendingOnly}
        loading={loading}
      />

      {/* Vendor Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
        </div>
      ) : filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No vendors found"
          description="Try adjusting your search or filters."
        />
      )}
    </div>
  );
};
