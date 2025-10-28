<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main
      class="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary-glow/5"
    >
      <div class="w-full max-w-md">
        <Card class="p-8 shadow-xl">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p class="text-muted-foreground">
              Get started with TicketFlow today
            </p>
          </div>

          <form @submit="handleSubmit(onSubmit)" class="space-y-5">
            <div class="space-y-2">
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                v-model="name"
                v-bind="nameAttrs"
                autocomplete="name"
                :class="{ 'border-destructive': errors.name }"
              />
              <p v-if="errors.name" class="text-sm text-destructive">
                {{ errors.name }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                v-model="email"
                v-bind="emailAttrs"
                autocomplete="email"
                :class="{ 'border-destructive': errors.email }"
              />
              <p v-if="errors.email" class="text-sm text-destructive">
                {{ errors.email }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                v-model="password"
                v-bind="passwordAttrs"
                autocomplete="new-password"
                :class="{ 'border-destructive': errors.password }"
              />
              <p v-if="errors.password" class="text-sm text-destructive">
                {{ errors.password }}
              </p>
            </div>

            <div class="space-y-2">
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                autocomplete="new-password"
                :class="{ 'border-destructive': errors.confirmPassword }"
              />
              <p v-if="errors.confirmPassword" class="text-sm text-destructive">
                {{ errors.confirmPassword }}
              </p>
            </div>

            <Button type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? "Creating account..." : "Create Account" }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              Already have an account?
              <RouterLink
                to="/login"
                class="text-primary font-medium hover:underline"
              >
                Sign in
              </RouterLink>
            </p>
          </div>
        </Card>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue-sonner";

import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { signupSchema } from "@/validation/authSchemas";

type SignupFormData = yup.InferType<typeof signupSchema>;

const router = useRouter();
const auth = useAuthStore();
const isLoading = ref(false);

const { handleSubmit, errors } = useForm<SignupFormData>({
  validationSchema: signupSchema,
  initialValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});

const { value: name, ...nameAttrs } = useField<string>("name");
const { value: email, ...emailAttrs } = useField<string>("email");
const { value: password, ...passwordAttrs } = useField<string>("password");
const { value: confirmPassword, ...confirmPasswordAttrs } =
  useField<string>("confirmPassword");

const onSubmit = async (data: SignupFormData) => {
  isLoading.value = true;
  try {
    const result = await auth.signup(data.email, data.password, data.name);

    if (result.success) {
      toast.success("Account created successfully! Welcome to TicketFlow.");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "Signup failed. Please try again.");
    }
  } catch {
    toast.error("An unexpected error occurred. Please try again.");
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => auth.isAuthenticated,
  (isAuth) => {
    if (isAuth) router.push("/dashboard");
  },
  { immediate: true }
);
</script>
