import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast';
const { showToast } = useCustomToast();

const credential = {
  email: ref(""),
  password: ref(""),
};

export const useLogin = () => {
  const router = useRouter();
  const loading = ref(false);

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.email.value || !credential.password.value
    );
  });

  const login = async () => {
    loading.value = true;
    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
          jwt
          user {
            id
            firstName
            lastName
            email
            Status
            PlanType
            accountBalance
            tradingBalance
            profit
            eth
            btc
            timeAdded
          }
        }
      }
    `;

    try {
      const response = await fetch('https://visionary-zpui.onrender.com/graphql/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: loginMutation,
          variables: {
            email: credential.email.value,
            password: credential.password.value
          }
        })
      });

      const data = await response.json();
      if (data?.errors) {
        showToast({
          title: "Error",
          message: data.errors[0].message,
          toastType: "error",
          duration: 3000
        });
      } else {
        const { jwt, user } = data?.data?.userLogin;
        window.localStorage.setItem('auth', JSON.stringify(jwt));
        window.localStorage.setItem('user', JSON.stringify(user));
        showToast({
          title: "Success",
          message: "Login was successful!",
          toastType: "success",
          duration: 3000
        });
        router.push('/dashboard');
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "An error occurred during login",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  return { credential, login, loading, isFormDisabled };
};
