import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { AppState } from "../reducers";
import { togglePlayerIsRotaldo } from "../actions";
import { getPlayerById } from "../selectors/players";

interface Props {
  playerId: number;
}
const PlayerRotaldoInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;
  const isRotaldo = useSelector<AppState, boolean>(
    state => getPlayerById(state, playerId).isRotaldo
  );
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(togglePlayerIsRotaldo(playerId));
  };

  return (
    <PlayerPropertyInput label="Rotaldo">
      <input type="checkbox" checked={isRotaldo} onChange={handleChange} />
    </PlayerPropertyInput>
  );
};

export default PlayerRotaldoInput;
