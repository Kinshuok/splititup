import {Appbar} from "../components/appbar.jsx";
import {Groups} from "../components/groups.jsx";
import {RecoilRoot} from "recoil";

export function Dashboard(){
    return <>
       <Appbar/>

        <RecoilRoot>
            <Groups/>
        </RecoilRoot>

    </>
}