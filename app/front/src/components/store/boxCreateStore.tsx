import { adLinkStore,adTextStore,benefitsCreateStore } from "@/constants/benefitsRegister";
import { BoxBenefits } from "../boxBenefits";
import { StyleCreateStore } from "@/styles/registerPage";
import type { PropsFormCreateStore } from "@/types/store.types";
import { FormCreateStore } from "../forms/formCreateStore";


export const BoxCreateStore = ({formRef}:PropsFormCreateStore)=>{
    return (
        <StyleCreateStore>
            <BoxBenefits
                formRef={formRef}
                adText={adTextStore}
                adLink={adLinkStore}
                benefits={benefitsCreateStore}
                />
            <FormCreateStore formRef={formRef}/>
        </StyleCreateStore>
    )
}
