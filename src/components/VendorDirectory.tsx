import { vendors } from "@/constants/data";
import type { Vendor } from "@/types/vendor";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { VendorCard } from "./VendorCard";
import { Filter, X, Search } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";

// Extract unique industries from vendors
const industries = Array.from(new Set(vendors.map((v) => v.industry)));

export const VendorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  //   const [vendors, setVendors] = useState<Vendor[]>([]);
  //   const [loading, setLoading] = useState(true);

  //   const fetchVendors = async () => {
  //     const response = await fetch("/api/vendors");
  //     const data = await response.json();
  //     setVendors(data);
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchVendors();
  //   }, []);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor: Vendor) => {
      const matchesSearch = vendor.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "all" || vendor.industry === selectedIndustry;
      const matchesVerification =
        !verifiedOnly || vendor.verificationStatus === "verified";

      return matchesSearch && matchesIndustry && matchesVerification;
    });
  }, [searchTerm, selectedIndustry, verifiedOnly]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("all");
    setVerifiedOnly(false);
  };

  const hasActiveFilters =
    searchTerm || selectedIndustry !== "all" || verifiedOnly;

  return (
    <div className="w-full p-2">
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
      <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <Label
              htmlFor="search"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Search Vendors
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="search"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Industry Filter */}
          <div>
            <Label
              htmlFor="industry"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Industry
            </Label>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Verification Filter */}
          <div>
            <Label
              htmlFor="verified"
              className="text-sm font-medium text-foreground mb-2 block"
            >
              Status
            </Label>
            <div className="flex items-center space-x-2 h-10">
              <Switch
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={setVerifiedOnly}
              />
              <Label htmlFor="verified" className="text-sm text-foreground">
                Verified only
              </Label>
            </div>
          </div>
        </div>

        {/* Results Info and Clear Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
            Showing {filteredVendors.length} of {vendors.length} vendors
          </p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Vendor Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No vendors found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters.
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
