import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  description = "There's no data to display.",
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto flex flex-col items-center justify-center border-dashed border-2 border-muted bg-muted/40 shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="mb-6 flex items-center justify-center rounded-full bg-muted p-4">
          {icon || <FileQuestion className="w-10 h-10 text-muted-foreground" />}
        </div>
        <h2 className="text-xl font-semibold mb-2 text-foreground text-center">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mb-6 text-center max-w-xs">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-2" variant="default">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
