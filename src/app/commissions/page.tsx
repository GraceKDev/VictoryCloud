import CommissionsForm from "../components/commissions/CommissionsForm";
import CommissionsSocials from "../components/commissions/CommissionsSocials";

export default function Writing() {
    return (
        <main className="flex-1 bg-onyx text-offWhite flex justify-center flex-col items-center">
            <div className="w-full max-w-5xl flex flex-1 min-h-full mx-auto items-center px-4 sm:px-8 py-8 sm:py-12">
                <div className="w-full flex flex-col justify-center lg:flex-row gap-8">
                    <div className="flex-1">
                        <CommissionsForm />
                    </div>
                    <div className="w-full lg:w-5/12">
                        <CommissionsSocials />
                    </div>
                </div>
            </div>
        </main>
    )
}
