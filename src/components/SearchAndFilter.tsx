import type { Vendor } from "@/types/vendor";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedIndustry: string;
  setSelectedIndustry: (value: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  filteredVendors: Vendor[];
  vendors: Vendor[];
  hasActiveFilters: string | boolean;
  clearFilters: () => void;
  pendingOnly: boolean;
  setPendingOnly: (value: boolean) => void;
  loading?: boolean;
}

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedIndustry,
  setSelectedIndustry,
  verifiedOnly,
  setVerifiedOnly,
  filteredVendors,
  vendors,
  hasActiveFilters,
  clearFilters,
  pendingOnly,
  setPendingOnly,
  loading = false,
}: SearchAndFilterProps) => {
  const industries = Array.from(new Set(vendors.map((v) => v.industry)));
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 shadow-sm w-full transition-all duration-300">
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-200" />
            <Input
              id="search"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus:ring-2 focus:ring-primary transition-all duration-200"
              // disabled={loading}
            />
            {/* {loading && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground animate-pulse">
                Loading...
              </span>
            )} */}
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
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md capitalize transition-all duration-200 focus:ring-2 focus:ring-primary hover:border-primary"
            disabled={loading}
          >
            {["all industries", ...industries].map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
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
            <div className="flex items-center space-x-2 h-10">
              <Switch
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(value) => {
                  setVerifiedOnly(value);
                  setPendingOnly(false);
                }}
                disabled={loading}
                className="transition-all duration-200"
              />
              <Label
                htmlFor="verified"
                className="text-sm text-foreground cursor-pointer transition-colors duration-200 hover:text-primary"
              >
                Verified
              </Label>
            </div>
            <div className="flex items-center space-x-2 h-10">
              <Switch
                id="pending"
                checked={pendingOnly}
                onCheckedChange={(value) => {
                  setPendingOnly(value);
                  setVerifiedOnly(false);
                }}
                disabled={loading}
                className="transition-all duration-200"
              />
              <Label
                htmlFor="pending"
                className="text-sm text-foreground cursor-pointer transition-colors duration-200 hover:text-primary"
              >
                Pending
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info and Clear Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-gray-300">
        <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
          Showing {filteredVendors.length} of {vendors.length} vendors
        </p>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            disabled={loading}
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
