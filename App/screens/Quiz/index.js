import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizIndex from "./QuizIndex";
import Quiz from "./Quiz";
import QuizEnd from "./QuizEnd";

const MainStack = createStackNavigator({
    QuizIndex: {
        screen: QuizIndex,
        navigationOptions: ({ navigation }) => ({
            headerTitle: "Quizzes",
            headerTintColor: "#fb5b5a",
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "#003f5c",
                borderBottomColor: "#003f5c"
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 50,
                padding: 5
            }
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.getParam("title"),
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: navigation.getParam("color"),
                borderBottomColor: navigation.getParam("color")
            }
        })
    },
    QuizEnd: {
        screen: QuizEnd,
        navigationOptions: ({ navigation }) => ({
            headerTitle: navigation.getParam("title"),
        })
    }
});

export default createAppContainer(MainStack);