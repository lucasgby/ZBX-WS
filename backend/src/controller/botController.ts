import { Buttons } from "whatsapp-web.js";
import { getHostgroups } from "../utils/RequestHostGroups";
import { token } from "../utils/tokenAuth";

type TypeBTN = {
  body: string
}

async function hostGroupBtns() {
  const { result } = await getHostgroups(token);

  const btn: TypeBTN[] = [];

  result.map((value, index) => {
    btn.push({ body: `${value.groupid}: ${value.name}` })
  });

  const buttons = new Buttons('HostGroups BTN', btn, 'ESCOLHA UM GRUPO DE HOSTS');

  return buttons;
}

export { hostGroupBtns }