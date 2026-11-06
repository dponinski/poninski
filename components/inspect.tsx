"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type InspectState = {
  label: string;
  tokens: string[];
};

const defaultState: InspectState = {
  label: "Move across the field",
  tokens: [
    "--color-surface-resting-subtle",
    "--color-surface-active-muted",
    "--radius-xs",
  ],
};

const InspectContext = createContext<{
  state: InspectState;
  inspect: (next: InspectState) => void;
  reset: () => void;
}>({
  state: defaultState,
  inspect: () => undefined,
  reset: () => undefined,
});

export function InspectProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InspectState>(defaultState);
  const inspect = useCallback((next: InspectState) => setState(next), []);
  const reset = useCallback(() => setState(defaultState), []);
  const value = useMemo(
    () => ({ state, inspect, reset }),
    [inspect, reset, state],
  );

  return (
    <InspectContext.Provider value={value}>{children}</InspectContext.Provider>
  );
}

export function useInspect() {
  return useContext(InspectContext);
}

export function Inspector() {
  const { state } = useInspect();

  return (
    // Decorative: mirrors hover/focus state; all content is available elsewhere.
    <div className="inspector" aria-hidden="true">
      <div className="inspector__group">
        <span className="dot" aria-hidden="true" />
        <b>{state.label}</b>
      </div>
      <div className="inspector__tokens">
        {state.tokens.map((token) => (
          <code key={token}>{token}</code>
        ))}
      </div>
    </div>
  );
}
