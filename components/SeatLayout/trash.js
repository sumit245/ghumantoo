{
    isDoubleDecker && deckPosition === 0 && (
        <View style={styles.driverContainer}>
            <Image
                source={require("../../assets/steering-wheel.png")}
                style={[
                    styles.steeringWheel,
                    {
                        alignSelf:
                            driverPosition === "left" ? "flex-start" : "flex-end",
                    },
                ]}
            />
        </View>
    )
}
{
    isDoubleDecker && deckPosition === 0 && (
        <Text style={[styles.deckText, { left: 10, top: 22 }]}>
            Lower Deck
        </Text>
    )
}

{
    isDoubleDecker && deckPosition === 1 && (
        <Text style={[styles.deckText, { left: 10, top: 22 }]}>
            Upper Deck
        </Text>
    )
}