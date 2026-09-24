"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Pencil,
  ExternalLink,
  Trash2,
  CheckCircle2,
  EyeOff,
  Search,
  Loader2,
  X,
} from "lucide-react";
import { formatDeadline } from "@/lib/format";
import {
  bulkDeleteJobs,
  bulkSetJobsPublishStatus,
  deleteJob,
  toggleJobPublishStatus,
} from "@/lib/actions/admin-jobs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type AdminJobRow = {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  publishedAt: string;
  company: { name: string };
  category: { name: string };
};

export function JobsTable({ initialJobs }: { initialJobs: AdminJobRow[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [isPending, startTransition] = useTransition();
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [deleteSingleId, setDeleteSingleId] = useState<{ id: string; title: string } | null>(null);

  // Filter jobs
  const filteredJobs = initialJobs.filter((job) => {
    if (filter === "published" && !job.isPublished) return false;
    if (filter === "draft" && job.isPublished) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.name.toLowerCase().includes(q) ||
        job.category.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const allVisibleSelected =
    filteredJobs.length > 0 && filteredJobs.every((j) => selectedIds.includes(j.id));
  const someVisibleSelected =
    filteredJobs.some((j) => selectedIds.includes(j.id)) && !allVisibleSelected;

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !filteredJobs.some((j) => j.id === id)));
    } else {
      const newIds = new Set([...selectedIds, ...filteredJobs.map((j) => j.id)]);
      setSelectedIds(Array.from(newIds));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = (publish: boolean) => {
    if (!selectedIds.length) return;
    startTransition(async () => {
      await bulkSetJobsPublishStatus(selectedIds, publish);
      setSelectedIds([]);
    });
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    startTransition(async () => {
      await bulkDeleteJobs(selectedIds);
      setSelectedIds([]);
      setConfirmBulkDelete(false);
    });
  };

  const handleToggleSinglePublish = (job: AdminJobRow) => {
    startTransition(async () => {
      await toggleJobPublishStatus(job.id, !job.isPublished);
    });
  };

  const handleDeleteSingle = () => {
    if (!deleteSingleId) return;
    startTransition(async () => {
      await deleteJob(deleteSingleId.id);
      setSelectedIds((prev) => prev.filter((id) => id !== deleteSingleId.id));
      setDeleteSingleId(null);
    });
  };

  const publishedCount = initialJobs.filter((j) => j.isPublished).length;
  const draftCount = initialJobs.length - publishedCount;

  return (
    <div className="mt-6 space-y-4">
      {/* Search and Filter Tabs */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-white text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({initialJobs.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("published")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "published"
                ? "bg-white text-emerald-700 shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("draft")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              filter === "draft"
                ? "bg-white text-amber-700 shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-white py-1.5 pr-3 pl-9 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto rounded-2xl bg-white ring-1 ring-border">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-foreground shadow-md ring-1 ring-border">
              <Loader2 className="size-4 animate-spin text-primary" /> Updating jobs...
            </div>
          </div>
        )}

        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someVisibleSelected;
                  }}
                  onChange={toggleSelectAll}
                  aria-label="Select all jobs"
                  className="size-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Posted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredJobs.map((job) => {
              const isSelected = selectedIds.includes(job.id);
              return (
                <tr
                  key={job.id}
                  className={`transition-colors ${
                    isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(job.id)}
                      aria-label={`Select ${job.title}`}
                      className="size-4 rounded border-border text-primary focus:ring-primary accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${job.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View live job page in new tab"
                        className="group inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
                      >
                        <span className="line-clamp-1">{job.title}</span>
                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground opacity-60 transition-all group-hover:opacity-100 group-hover:text-primary" />
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{job.company.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{job.category.name}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleSinglePublish(job)}
                      title={`Click to ${job.isPublished ? "unpublish" : "publish"}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                        job.isPublished
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          job.isPublished ? "bg-emerald-600" : "bg-amber-600"
                        }`}
                      />
                      {job.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDeadline(job.publishedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/jobs/${job.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${job.title} on site`}
                        title="View on site"
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/jobs/${job.id}/edit`}
                        aria-label={`Edit ${job.title}`}
                        title="Edit job"
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDeleteSingleId({ id: job.id, title: job.title })}
                        aria-label={`Delete ${job.title}`}
                        title="Delete job"
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                  {search
                    ? "No jobs matched your search criteria."
                    : filter !== "all"
                    ? `No ${filter} jobs found.`
                    : "No jobs yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Batch Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-foreground px-4 py-3 text-background shadow-2xl ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 border-r border-white/20 pr-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {selectedIds.length}
            </span>
            <span className="text-sm font-medium">selected</span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleBulkPublish(true)}
            disabled={isPending}
            className="h-8 gap-1.5 text-xs text-emerald-300 hover:bg-emerald-950 hover:text-emerald-200"
          >
            <CheckCircle2 className="size-3.5" /> Publish
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleBulkPublish(false)}
            disabled={isPending}
            className="h-8 gap-1.5 text-xs text-amber-300 hover:bg-amber-950 hover:text-amber-200"
          >
            <EyeOff className="size-3.5" /> Unpublish
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setConfirmBulkDelete(true)}
            disabled={isPending}
            className="h-8 gap-1.5 text-xs text-red-400 hover:bg-red-950 hover:text-red-300"
          >
            <Trash2 className="size-3.5" /> Delete
          </Button>

          <button
            type="button"
            onClick={() => setSelectedIds([])}
            className="ml-1 rounded-lg p-1 text-muted-foreground hover:bg-white/10 hover:text-background"
            aria-label="Clear selection"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={confirmBulkDelete} onOpenChange={setConfirmBulkDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.length} selected job(s)?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All selected jobs will be permanently deleted and removed
              from the live site.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmBulkDelete(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBulkDelete} disabled={isPending}>
              {isPending ? "Deleting..." : `Delete ${selectedIds.length} Job(s)`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Single Delete Confirmation Dialog */}
      <Dialog open={!!deleteSingleId} onOpenChange={(open) => !open && setDeleteSingleId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete &ldquo;{deleteSingleId?.title}&rdquo;?</DialogTitle>
            <DialogDescription>
              This cannot be undone. This job will be removed from the public website immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteSingleId(null)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSingle} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
