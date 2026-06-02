import CommissionsForm from "../components/commissions/CommissionsForm";
import CommissionsSocials from "../components/commissions/CommissionsSocials";

export default function Writing() {
    return (
        <main className="flex-1 bg-white flex justify-center flex-col items-center">
            <div className="w-full max-w-5xl flex flex-1 min-h-full mx-auto items-center">
                <div className="flex flex-col justify-center lg:flex-row gap-8">
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