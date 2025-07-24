import { MapPin, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Vendor } from "@/types/vendor";

// Helper to get initials from company name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <Card className="group bg-white border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Top: Avatar & Verification */}
        <div className="flex justify-between gap-2 mb-4">
          <div className="flex items-center gap-3">
            {vendor.logoUrl ? (
              <img
                src={vendor.logoUrl}
                alt={vendor.companyName}
                className="w-12 h-12 rounded-full object-cover border border-muted shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary border border-gray-300 shadow-sm shrink-0">
                {getInitials(vendor.companyName)}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {vendor.companyName}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                {vendor.industry}
              </p>
            </div>
          </div>
          <Badge
            variant={
              vendor.verificationStatus === "verified" ? "default" : "secondary"
            }
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border-0 shadow-none !h-6 ${
              vendor.verificationStatus === "verified"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {vendor.verificationStatus === "verified" ? (
              <>
                <CheckCircle className="w-4 h-4 mr-0.5" /> Verified
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 mr-0.5" /> Pending
              </>
            )}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span className="truncate">{vendor.location}</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action button */}
        <Button
          variant="default"
          className="w-full font-medium text-base py-2 rounded-lg shadow-sm group-hover:bg-primary/90 group-hover:scale-[1.02] transition-all border hover:border-blue-700 hover:text-blue-700"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
