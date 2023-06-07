# mongo commands

> net stop MongoDB
> net start MongoDB

# api endpoint tests

Endpoint Help

> http://localhost:1337/api/mongo/

View server structure

> http://localhost:1337/api/mongo/view

Test search query

> http://localhost:1337/api/mongo/mtg/all-cards/search?q=avacyn|name,oracle_text&filter=lang:en|reprint:false

> http://localhost:1337/api/mongo/mtg/all-cards/search?q=avacyn|name&filter=lang:en|reprint:false|type_line:creature&schema=name,type_line,reprint,lang,mana_cost

# All Attributes

"object": Indicates the type of object, which in this case would be "card."
"id": The unique identifier for the card.
"oracle_id": The unique identifier for the card's oracle entry.
"multiverse_ids": An array of identifiers for different printings of the card on Magic Online.
"mtgo_id": The identifier for the card on Magic: The Gathering Online.
"mtgo_foil_id": The identifier for the foil version of the card on Magic: The Gathering Online.
"tcgplayer_id": The identifier for the card on TCGplayer.
"cardmarket_id": The identifier for the card on Cardmarket.
"name": The name of the card.
"lang": The language the card is printed in.
"released_at": The date the card was released.
"uri": The URI (Uniform Resource Identifier) of the card's API representation.
"scryfall_uri": The URI for the card's page on Scryfall.
"layout": The layout of the card (e.g., normal, split, flip, etc.).
"highres_image": Indicates if a high-resolution image is available for the card.
"image_status": The status of the card's image (e.g., "missing," "placeholder," etc.).
"image_uris": URLs for different card images (e.g., normal, small, large, etc.).
"mana_cost": The mana cost of the card.
"cmc": The converted mana cost of the card.
"type_line": The card's type line, including card types, subtypes, and supertypes.
"oracle_text": The card's rules text or oracle text.
"power": The power of the card (if applicable).
"toughness": The toughness of the card (if applicable).
"colors": An array of colors that the card has.
"color_identity": An array of colors in the card's color identity.
"keywords": An array of keywords associated with the card.
"legalities": The card's legality in different formats.
"games": The games in which the card is legal.
"reserved": Indicates if the card is on the Reserved List.
"foil": Indicates if the card has a foil version.
"nonfoil": Indicates if the card has a non-foil version.
"finishes": An array of available finishes for the card (e.g., foil, non-foil, etc.).
"oversized": Indicates if the card is an oversized card.
"promo": Indicates if the card is a promotional card.
"reprint": Indicates if the card is a reprint.
"variation": Indicates if the card is a variation of another card.
"set_id": The identifier for the card's set.
"set": The code for the card's set.
"set_name": The name of the card's set.
"set_type": The type of the card's set (e.g., expansion, core, etc.).
"set_uri": The URI for the set's API representation.
"set_search_uri": The URI for searching cards in the set.
"scryfall_set_uri": The URI for the set's page on Scryfall.
"rulings_uri": The URI for the card's rulings on Scryfall.
"prints_search_uri": The URI for searching prints of the card.
"collector_number": The collector number of the card within its set.
"digital": Indicates if the card is only available in digital form.
"rarity": The rarity of the card.
"flavor_text": The flavor text of the card.
"card_back_id": The identifier for the card's back face.
"artist": The name of the card's artist.
"artist_ids": The identifier(s) for the card's artist(s).
"illustration_id": The identifier for the card's illustration.
"border_color": The color of the card's border.
"frame": The frame style of the card (e.g., normal, old, showcase, etc.).
"full_art": Indicates if the card is a full-art card.
"textless": Indicates if the card has no text.
"booster": Indicates if the card appears in booster packs.
"story_spotlight": Indicates if the card is story spotlighted.
"edhrec_rank": The card's ranking on EDHREC.com.
"penny_rank": The card's ranking on the Penny Dreadful format.
"prices": The pricing information for the card.
"related_uris": Related URIs for the card (e.g., gatherer, tcgplayer, etc.).
