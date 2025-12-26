import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useCreateActivity } from "@/hooks/useActivities";

const activitySchema = z.object({
  title: z.string().min(2, "Title is required").max(100),
  type: z.enum(["assignment", "quiz", "lab", "seminar", "project"]),
  description: z.string().max(500).optional(),
  due_date: z.string().optional(),
  max_score: z.number().min(1).max(1000).default(100),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export function AddActivityDialog() {
  const [open, setOpen] = useState(false);
  const createActivity = useCreateActivity();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      max_score: 100,
    },
  });

  const onSubmit = async (data: ActivityFormData) => {
    await createActivity.mutateAsync({
      title: data.title,
      type: data.type,
      description: data.description || null,
      due_date: data.due_date ? new Date(data.due_date).toISOString() : null,
      max_score: data.max_score,
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 w-full lg:w-auto">
          <Plus className="h-4 w-4" />
          Create Activity
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Assignment #1"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              onValueChange={(value) =>
                setValue("type", value as ActivityFormData["type"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="lab">Lab</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="project">Project</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Activity details..."
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input id="due_date" type="datetime-local" {...register("due_date")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_score">Max Score</Label>
            <Input
              id="max_score"
              type="number"
              {...register("max_score", { valueAsNumber: true })}
            />
            {errors.max_score && (
              <p className="text-sm text-destructive">
                {errors.max_score.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createActivity.isPending}
            >
              {createActivity.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Activity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
