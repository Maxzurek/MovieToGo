import { createContext } from "react";
import { WatchListDTO } from "../../models/watchlist.models";

const WatchlistContext = createContext<{
    selectedWatchListDTO: WatchListDTO | undefined;
    setSelectedWatchListDTO(selectedWatchListDTO: WatchListDTO | undefined): void
}>({
    selectedWatchListDTO: undefined,
    setSelectedWatchListDTO: () => { },
});

export default WatchlistContext;