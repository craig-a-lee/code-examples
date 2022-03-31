import AsyncStorage from '@react-native-async-storage/async-storage';
// function initLocalStorage() {
//   if (!localStorage.getItem('game')) {
//     localStorage.setItem('game', JSON.stringify([]));
//   }
// }

// a player must have a name and a score
// export default async function addPlayer(player) {
//   if (!player.name || !player.points) {
//     throw new Error('invalid player');
//   }
//   const l = JSON.parse(localStorage.getItem('game'));
//   // add player to the list
//   l.push(player);
//   localStorage.setItem('game', JSON.stringify(l));
// }

export default async function addPlayer(player) {
  if (!player) {
    throw new Error('invalid player');
  }

  // check if the user is in storage
  // if yes, return previous score
  try {
    const previousScore = await AsyncStorage.getItem(player);
    if (previousScore == null) {
      await AsyncStorage.setItem(player, '0');
      return 0;
    }
    return Number(previousScore);
  } catch (error) {
    throw new Error('an error!');
  }
}

export async function updateScore(player, score) {
    if (!player || !score) {
        throw new Error('invalid player');
    }

    try {
        await AsyncStorage.setItem(player, score);
    } catch(e) {
        throw new Error('another error');
    }
}