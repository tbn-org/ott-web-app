import {useQuery} from "../../../_snowpack/pkg/react-query.js";
import {getPaymentDetails, getSubscriptions, getTransactions} from "../../services/subscription.service.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
const SubscriptionContainer = ({children}) => {
  const customer = AccountStore.useState((state) => state.user);
  const auth = AccountStore.useState((state) => state.auth);
  const {config} = ConfigStore.getRawState();
  const {cleengSandbox: sandbox} = config;
  const jwt = auth?.jwt || "";
  const customerId = customer?.id || -1;
  const getSubscriptionsQuery = useQuery(["subscriptions", customerId], () => getSubscriptions({customerId}, sandbox, jwt));
  const {data: subscriptions, isLoading: isSubscriptionsLoading} = getSubscriptionsQuery;
  const getPaymentDetailsQuery = useQuery(["paymentDetails", customerId], () => getPaymentDetails({customerId}, sandbox, jwt));
  const {data: paymentDetails, isLoading: isPaymentDetailsLoading} = getPaymentDetailsQuery;
  const getTransactionsQuery = useQuery(["transactions", customerId], () => getTransactions({customerId}, sandbox, jwt));
  const {data: transactions, isLoading: isTransactionsLoading} = getTransactionsQuery;
  return children({
    activeSubscription: subscriptions?.responseData?.items.find((subscription) => subscription.status !== "expired" && subscription.status !== "terminated"),
    activePaymentDetail: paymentDetails?.responseData?.paymentDetails.find((paymentDetails2) => paymentDetails2.active),
    subscriptions: subscriptions?.responseData?.items,
    paymentDetails: paymentDetails?.responseData?.paymentDetails,
    transactions: transactions?.responseData?.items,
    isLoading: isSubscriptionsLoading || isPaymentDetailsLoading || isTransactionsLoading
  });
};
export default SubscriptionContainer;
