import { WritingInterface } from "@/app/lib/types/writing";
import {writing} from "../../lib/writing";
import WritingItem from "./WritingItem";
export default function WritingDisplayGrid() {
    return (
        
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,280px))] auto-rows-[540px] justify-center">
           {writing.map((writing:WritingInterface) => (
            <a href={`/writing/${writing.id}`} key={writing.id}>
                <WritingItem {...writing} />
            </a>
        ))}
        </section>
    )
}