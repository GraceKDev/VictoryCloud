import CommissionsForm from "../components/commissions/CommissionsForm";
import CommissionsSocials from "../components/commissions/CommissionsSocials";

type ConfigResponse = {
    commissions?: {
        showAvailabilityBanner?: boolean;
        commissionsAvailable?: boolean;
    };
};

async function getConfig(): Promise<ConfigResponse | null> {
    try {
        const response = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Config/GetConfig`, { cache: "no-store" });
        if (!response.ok) return null;
        return (await response.json()) as ConfigResponse;
    } catch {
        return null;
    }
}

export default async function Writing() {
    const config = await getConfig();
    const showBanner = config?.commissions?.showAvailabilityBanner ?? true;
    const commissionsAvailable = config?.commissions?.commissionsAvailable ?? true;

    return (
        <main className="flex-1 bg-onyx text-offWhite flex justify-center flex-col items-center">
            <div className="w-full max-w-5xl flex flex-1 min-h-full mx-auto items-center px-4 sm:px-8 py-8 sm:py-12">
                <div className="w-full flex flex-col gap-4">
                    {showBanner && (
                        <div
                            className="rounded-2xl border px-5 py-4 text-sm sm:text-base font-semibold shadow-lg"
                            style={{
                                backgroundColor: commissionsAvailable ? "rgba(45, 71, 57, 0.92)" : "rgba(18, 22, 25, 0.96)",
                                borderColor: commissionsAvailable ? "#b5cbb7" : "#2d4739",
                                color: "#f5f5f5",
                            }}
                        >
                            Commissions are {commissionsAvailable ? "available" : "unavailable"}.
                        </div>
                    )}
                    <div className="w-full flex flex-col justify-center lg:flex-row gap-8">
                    <div className="flex-1">
                        <CommissionsForm />
                    </div>
                    <div className="w-full lg:w-5/12">
                        <CommissionsSocials />
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
