import { EditingPanel } from "@/app/components/EditingPanel";
import { HomePanel } from "@/app/components/HomePanel";
import { MusicPanel } from "@/app/components/MusicPanel";
import { SocialsPanel } from "@/app/components/SocialsPanel";
import { TabNavigation } from "@/app/components/TabNavigation";
import { useTabLayout } from "@/app/hooks/useTabLayout";
import { useTabRouting } from "@/app/hooks/useTabRouting";
import type { Tab } from "@/app/types";

const tabPanelClass = (activeTab: Tab, tab: Tab): string => {
  const baseClass =
    "transition-[opacity,transform] duration-250 ease-[cubic-bezier(.1,0,0,1)]";

  if (activeTab === tab) {
    return `${baseClass} relative z-10 translate-y-0 opacity-100`;
  }

  return `${baseClass} pointer-events-none absolute inset-0 z-0 -translate-y-1 opacity-0`;
};

function App() {
  const { activeTab, isNotFound, setActiveTab } = useTabRouting();
  const { navRef, panelHeight, setPanelRef, setTabButtonRef, tabIndicator } =
    useTabLayout(activeTab);

  return (
    <main className="design-fade relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#070707] px-5 py-12 text-zinc-100 sm:px-10">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 w-full max-w-3xl font-mono">
        {isNotFound ? (
          <section className="m-auto w-fit">
            <p className="text-xs tracking-[0.2em] text-zinc-500">error</p>
            <h1 className="text-3xl font-semibold tracking-[0.12em] text-[#3c9] sm:text-4xl">
              404
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              we couldn't find the page you're looking for.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              how about{" "}
              <a
                href="/"
                className="w-fit cursor-pointer text-sm text-zinc-500 transition-all duration-200 ease-[cubic-bezier(.1,0,0,1)] hover:pl-2 hover:text-[#3c9]"
              >
                going back home?
              </a>
            </p>
          </section>
        ) : (
          <>
            <TabNavigation
              activeTab={activeTab}
              navRef={navRef}
              onTabChange={setActiveTab}
              setTabButtonRef={setTabButtonRef}
              tabIndicator={tabIndicator}
            />

            <div
              className="relative min-h-80 overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(.1,0,0,1)]"
              style={{
                ...(panelHeight === null ? {} : { height: `${panelHeight}px` }),
              }}
            >
              <HomePanel
                ref={setPanelRef("home")}
                className={tabPanelClass(activeTab, "home")}
                onSelectSocials={() => setActiveTab("socials")}
              />
              <MusicPanel
                ref={setPanelRef("music")}
                className={tabPanelClass(activeTab, "music")}
              />
              <SocialsPanel
                ref={setPanelRef("socials")}
                className={tabPanelClass(activeTab, "socials")}
              />
              <EditingPanel
                ref={setPanelRef("editing")}
                className={tabPanelClass(activeTab, "editing")}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
