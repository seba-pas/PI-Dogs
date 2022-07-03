const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  dogDetails: {}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? // ascendente
            state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : //descendente
            state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "ORDER_BY_WEIGHT":
      let arrByWeight =
        action.payload === "asc"
          ? state.dogs.sort((a, b) => {
              let weightSplitA = a.weight.split(" - ");
              let weightSplitB = b.weight.split(" - ");

              let weightA = weightSplitA > 0 ? weightSplitA : weightSplitA[0];
              let weightB = weightSplitA > 0 ? weightSplitB : weightSplitB[0];

              if (Array.isArray(weightA)) {
                weightA = weightA[0];
              }
              if (Array.isArray(weightB)) {
                weightB = weightB[0];
              }
              if (isNaN(weightA)) {
                weightA = weightB;
              }
              if (isNaN(weightB)) {
                weightB = 0;
              }
              console.log(weightA);
              console.log(weightB);
              return weightA - weightB;
            })
          : //descendente
            state.dogs.sort((a, b) => {
              //split de weight (usamos los menores)
              let weightSplitA = a.weight.split(" - ");
              let weightSplitB = b.weight.split(" - ");
              let weightA = parseInt(weightSplitA[0]);
              let weightB = parseInt(weightSplitB[0]);

              return weightB - weightA;
            });
      return {
        ...state,

        dogs: arrByWeight,
      };
    case "TEMPERAMENTS_FILTER":
      const allDogsState = state.allDogs;
      const tempsFilter =
        action.payload === "all"
          ? allDogsState
          : allDogsState.filter((e) => e.temperaments.includes(action.payload));
      return {
        ...state,
        dogs: tempsFilter,
      };
    case "CREATED_FILTER":
      const dogsToCreatedFilter = state.dogs; 
      console.log(dogsToCreatedFilter)    
      const createdFilter =
        action.payload === "created"
          ? dogsToCreatedFilter.filter((e) => e.created)
          : dogsToCreatedFilter.filter((e) => !e.created);
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : createdFilter,
      };
    case "SEARCH_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
      // case 'POST_DOG':
      //   return {
      //     ...state
      //   }
      case 'GET_DETAILS':
        return {
          ...state,
          dogDetails: action.payload
        }
        case 'SET_DETAIL_DOGS':
          return {
            ...state,
            dogDetails: {}
            


          }

    default:
      return {
        ...state,
      };
  }
}
