"use client";

import { useEffect, useRef } from "react";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    const key = "pc_vid";
    let id = localStorage.getItem(key);
    if (!id) {
      id = "v_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "";
  }
}

export function trackOpportunityAction({
  opportunityType,
  opportunitySlug,
  opportunityTitle,
  opportunityId,
  action = "VIEW",
}: {
  opportunityType: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
  opportunitySlug: string;
  opportunityTitle: string;
  opportunityId?: string;
  action?: "VIEW" | "APPLY";
}) {
  if (typeof window === "undefined") return;

  const visitorId = getOrCreateVisitorId();
  const referrer = typeof document !== "undefined" ? document.referrer : "";

  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        opportunityType,
        opportunitySlug,
        opportunityTitle,
        opportunityId,
        action,
        visitorId,
        referrer,
      }),
      keepalive: true,
    }).catch(() => {
      // silently ignore tracking network errors
    });
  } catch {}
}

export function OpportunityTracker({
  opportunityType,
  opportunitySlug,
  opportunityTitle,
  opportunityId,
}: {
  opportunityType: "JOB" | "SCHOLARSHIP" | "GRANT" | "BLOG";
  opportunitySlug: string;
  opportunityTitle: string;
  opportunityId?: string;
}) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    trackOpportunityAction({
      opportunityType,
      opportunitySlug,
      opportunityTitle,
      opportunityId,
      action: "VIEW",
    });
  }, [opportunityType, opportunitySlug, opportunityTitle, opportunityId]);

  return null;
}
