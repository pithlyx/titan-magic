# mongo commands

> net stop MongoDB
> net start MongoDB

## Db Info

# Card Attributes

    -['object', ' Indicates the type of object, which in this case would be "card."'],
    -['id', ' The unique identifier for the card.'],
    -['oracle_id', ' The unique identifier for the card\'s oracle entry.'],
    -['multiverse_ids', ' An array of identifiers for different printings of the card on Magic Online.'],
    -['mtgo_id', ' The identifier for the card on Magic: The Gathering Online.'],
    -['mtgo_foil_id', ' The identifier for the foil version of the card on Magic: The Gathering Online.'],
    -['tcgplayer_id', ' The identifier for the card on TCGplayer.'],
    -['cardmarket_id', ' The identifier for the card on Cardmarket.'],
    -['name', ' The name of the card.'],
    -['lang', ' The language the card is printed in.'],
    -['released_at', ' The date the card was released.'],
    -['uri', ' The URI (Uniform Resource Identifier) of the card\'s API representation.'],
    -['scryfall_uri', ' The URI for the card\'s page on Scryfall.'],
    -['layout', ' The layout of the card (e.g., normal, split, flip, etc.).'],
    -['highres_image', ' Indicates if a high-resolution image is available for the card.'],
    -['image_status', ' The status of the card\'s image (e.g., "missing," "placeholder," etc.).'],
    -['image_uris', ' URLs for different card images (e.g., normal, small, large, etc.).'],
    -['mana_cost', ' The mana cost of the card.'],
    -['cmc', ' The converted mana cost of the card.'],
    -['type_line', ' The card\'s type line, including card types, subtypes, and supertypes.'],
    -['oracle_text', ' The card\'s rules text or oracle text.'],
    -['power', ' The power of the card (if applicable).'],
    -['toughness', ' The toughness of the card (if applicable).'],
    -['colors', ' An array of colors that the card has.'],
    -['color_identity', ' An array of colors in the card\'s color identity.'],
    -['keywords', ' An array of keywords associated with the card.'],
    -['legalities', ' The card\'s legality in different formats.'],
    -['games', ' The games in which the card is legal.'],
    -['reserved', ' Indicates if the card is on the Reserved List.'],
    -['foil', ' Indicates if the card has a foil version.'],
    -['nonfoil', ' Indicates if the card has a non-foil version.'],
    -['finishes', ' An array of available finishes for the card (e.g., foil, non-foil, etc.).'],
    -['oversized', ' Indicates if the card is an oversized card.'],
    -['promo', ' Indicates if the card is a promotional card.'],
    -['reprint', ' Indicates if the card is a reprint.'],
    -['variation', ' Indicates if the card is a variation of another card.'],
    -['set_id', ' The identifier for the card\'s set.'],
    -['set', ' The code for the card\'s set.'],
    -['set_name', ' The name of the card\'s set.'],
    -['set_type', ' The type of the card\'s set (e.g., expansion, core, etc.).'],
    -['set_uri', ' The URI for the set\'s API representation.'],
    -['set_search_uri', ' The URI for searching cards in the set.'],
    -['scryfall_set_uri', ' The URI for the set\'s page on Scryfall.'],
    -['rulings_uri', ' The URI for the card\'s rulings on Scryfall.'],
    -['prints_search_uri', ' The URI for searching prints of the card.'],
    -['collector_number', ' The collector number of the card within its set.'],
    -['digital', ' Indicates if the card is only available in digital form.'],
    -['rarity', ' The rarity of the card.'],
    -['flavor_text', ' The flavor text of the card.'],
    -['card_back_id', ' The identifier for the card\'s back face.'],
    -['artist', ' The name of the card\'s artist.'],
    -['artist_ids', ' The identifier(s) for the card\'s artist(s).'],
    -['illustration_id', ' The identifier for the card\'s illustration.'],
    -['border_color', ' The color of the card\'s border.'],
    -['frame', ' The frame style of the card (e.g., normal, old, showcase, etc.).'],
    -['full_art', ' Indicates if the card is a full-art card.'],
    -['textless', ' Indicates if the card has no text.'],
    -['booster', ' Indicates if the card appears in booster packs.'],
    -['story_spotlight', ' Indicates if the card is story spotlighted.'],
    -['edhrec_rank', ' The card\'s ranking on EDHREC.com.'],
    -['penny_rank', ' The card\'s ranking on the Penny Dreadful format.'],
    -['prices', ' The pricing information for the card.'],
    -['related_uris', ' Related URIs for the card (e.g., gatherer, tcgplayer, etc.).']

- "Keys":{
  - "Colors":[
    - ['{W}', 'White'],
    - ['{U}', 'Blue'],
    - ['{B}', 'Black'],
    - ['{R}', 'Red'],
    - ['{G}', 'Green']
    - ]
  - "Symbols":[ -['{T}', 'Tap this permanent'], -['{Q}', 'Untap this permanent'], -['{E}', 'An energy counter'], -['{PW}', 'Planeswalker'], -['{CHAOS}', 'Chaos'], -['{A}', 'An acorn counter'], -['{TK}', 'A ticket counter'], -['{X}', 'X generic mana', '0.0'], -['{Y}', 'Y generic mana', '0.0'], -['{Z}', 'Z generic mana', '0.0'], -['{0}', 'Zero mana', '0.0'], -['{½}', 'One-half generic mana', '0.5'], -['{1}', 'One generic mana', '1.0'], -['{2}', 'Two generic mana', '2.0'], -['{3}', 'Three generic mana', '3.0'], -['{4}', 'Four generic mana', '4.0'], -['{5}', 'Five generic mana', '5.0'], -['{6}', 'Six generic mana', '6.0'], -['{7}', 'Seven generic mana', '7.0'], -['{8}', 'Eight generic mana', '8.0'], -['{9}', 'Nine generic mana', '9.0'], -['{10}', 'Ten generic mana', '10.0'], -['{11}', 'Eleven generic mana', '11.0'], -['{12}', 'Twelve generic mana', '12.0'], -['{13}', 'Thirteen generic mana', '13.0'], -['{14}', 'Fourteen generic mana', '14.0'], -['{15}', 'Fifteen generic mana', '15.0'], -['{16}', 'Sixteen generic mana', '16.0'], -['{17}', 'Seventeen generic mana', '17.0'], -['{18}', 'Eighteen generic mana', '18.0'], -['{19}', 'Nineteen generic mana', '19.0'], -['{20}', 'Twenty generic mana', '20.0'], -['{100}', 'One hundred generic mana', '100.0'], -['{1000000}', 'One million generic mana', '1000000.0'], -['{∞}', 'Infinity\nInfinite generic mana'], -['{W/U}', 'One white or blue mana', '1.0'], -['{W/B}', 'One white or black mana', '1.0'], -['{B/R}', 'One black or red mana', '1.0'], -['{B/G}', 'One black or green mana', '1.0'], -['{U/B}', 'One blue or black mana', '1.0'], -['{U/R}', 'One blue or red mana', '1.0'], -['{R/G}', 'One red or green mana', '1.0'], -['{R/W}', 'One red or white mana', '1.0'], -['{G/W}', 'One green or white mana', '1.0'], -['{G/U}', 'One green or blue mana', '1.0'], -['{B/G/P}', 'One black mana, one green mana, or 2 life', '1.0'], -['{B/R/P}', 'One black mana, one red mana, or 2 life', '1.0'], -['{G/U/P}', 'One green mana, one blue mana, or 2 life', '1.0'], -['{G/W/P}', 'One green mana, one white mana, or 2 life', '1.0'], -['{R/G/P}', 'One red mana, one green mana, or 2 life', '1.0'], -['{R/W/P}', 'One red mana, one white mana, or 2 life', '1.0'], -['{U/B/P}', 'One blue mana, one black mana, or 2 life', '1.0'], -['{U/R/P}', 'One blue mana, one red mana, or 2 life', '1.0'], -['{W/B/P}', 'One white mana, one black mana, or 2 life', '1.0'], -['{W/U/P}', 'One white mana, one blue mana, or 2 life', '1.0'], -['{2/W}', 'Two generic mana or one white mana', '2.0'], -['{2/U}', 'Two generic mana or one blue mana', '2.0'], -['{2/B}', 'Two generic mana or one black mana', '2.0'], -['{2/R}', 'Two generic mana or one red mana', '2.0'], -['{2/G}', 'Two generic mana or one green mana', '2.0'], -['{P}', 'One colored mana or two life', '1.0'], -['{W/P}', 'One white mana or two life', '1.0'], -['{U/P}', 'One blue mana or two life', '1.0'], -['{B/P}', 'One black mana or two life', '1.0'], -['{R/P}', 'One red mana or two life', '1.0'], -['{G/P}', 'One green mana or two life', '1.0'], -['{HW}', 'One-half white mana', '0.5'], -['{HR}', 'One-half red mana', '0.5'], -['{W}', 'One white mana', '1.0'], -['{U}', 'One blue mana', '1.0'], -['{B}', 'One black mana', '1.0'], -['{R}', 'One red mana', '1.0'], -['{G}', 'One green mana', '1.0'], -['{C}', 'One colorless mana', '1.0'], -['{S}', 'One snow mana', '1.0']
    -]
    -}
- }

## Stretch Goals

- implement catalogs
