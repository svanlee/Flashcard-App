import React, { useState, useEffect } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";
import { listDecks, updateDeck } from "../../utils/api";

function Home ({ updateDecks, deckLength }) {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        // if switching state (ex: clicking mult.. btns), 
        // cancels the loading of the previous state to avoid errors.
        // const abortController = window.AbortController; //is syntax correct??
        const abortController = new AbortController()
        // 'listDecks' retrieves all decks using a fetch,
        // thus, async/await are needed.
        const retrieveDecks = async () => {
            const ApiDecks = await listDecks(abortController.signal)
            // change the state 'setDecks' to the contents of 'listDecks'.
            setDecks(() => ApiDecks)
        }

        retrieveDecks()
        return () => abortController.abort()
    }, [deckLength])

    // console.log(decks)


    return (
        <div>
            <div className="row mx-auto">
                <Link to={"/decks/new"} className="btn btn-secondary mb-2">
                {/* <i className="bi bi-plus"></i> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 1 20 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                    Create Deck
                </Link>
            </div>

            <div className="row mx-auto">
                {decks.map((deck) =>
                    <DeckList 
                        key={deck.id}
                        deck={deck}
                        updateDecks={updateDecks}
                    />
                )}
            </div>
            
        </div>
        
    )
}

export default Home