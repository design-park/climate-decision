export const decisionTree = {
  N_0_0: {
    id: "N_0_0",
    year: "2025",
    text: "It's 2025. Do you support implementing bold policies to phase out coal use?",
    options: [
      {
        label: "Yes – Introduce a $20 per ton coal tax and cut new coal infrastructure by 60%",
        next: "N_1_0",
        effects: {
          "Greenhouse Gas Net Emissions": "N10"
        }
      },
      {
        label: "No – Opt for a milder $10 per ton coal tax and a 30% cut in new coal infrastructure",
        next: "N_1_1",
        effects: {
            "Greenhouse Gas Net Emissions": "N11"
        }
      }
    ]
  },

  N_1_0: {
    id: "N_1_0",
    year: "2030",
    text: "It's 2030. To accelerate the transition to clean energy, how much would you subsidize renewable electricity producers?",
    options: [
      {
        label: "Generous support – reduce renewable energy costs by $0.05 per kWh through subsidies",
        next: "N_2_0",
        effects: {
          "Greenhouse Gas Net Emissions": "N20"
        }
      },
      {
        label: "Modest support – reduce renewable energy costs by $0.01 per kWh through subsidies",
        next: "N_2_1",
        effects: {
            "Greenhouse Gas Net Emissions": "N21"
        }
      }
    ]
  },

  N_1_1: {
    id: "N_1_1",
    year: "2030",
    text: "It's 2030. To accelerate the transition to clean energy, how much would you subsidize renewable electricity producers?",
    options: [
      {
        label: "Generous support – reduce renewable energy costs by $0.05 per kWh through subsidies",
        next: "N_2_2",
        effects: {
          "Greenhouse Gas Net Emissions": "N22"
        }
      },
      {
        label: "Modest support – reduce renewable energy costs by $0.01 per kWh through subsidies",
        next: "N_2_3",
        effects: {
            "Greenhouse Gas Net Emissions": "N23"
        }
      }
    ]
  },
  // ...other nodes
};
