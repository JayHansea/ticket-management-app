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
              Welcome Back
            </h1>
            <p class="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form @submit="handleSubmit(onSubmit)" class="space-y-5">
            <div class="space-y-2">
              <Label for="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                v-model="email"
                v-bind="emailAttrs"
                :class="{ 'border-destructive': errors.email }"
                autocomplete="email"
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
                placeholder="Enter your password"
                v-model="password"
                v-bind="passwordAttrs"
                :class="{ 'border-destructive': errors.password }"
                autocomplete="current-password"
              />
              <p v-if="errors.password" class="text-sm text-destructive">
                {{ errors.password }}
              </p>
            </div>

            <Button type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? "Signing in..." : "Sign In" }}
            </Button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-muted-foreground">
              Don't have an account?
              <RouterLink
                to="/signup"
                class="text-primary font-medium hover:underline"
              >
                Sign up
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
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema } from "@/validation/authSchemas";

type LoginFormData = yup.InferType<typeof loginSchema>;

const router = useRouter();
const authStore = useAuthStore();
const { login, isAuthenticated } = authStore;

const isLoading = ref(false);

const { handleSubmit, errors } = useForm<LoginFormData>({
  validationSchema: loginSchema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { value: email, ...emailAttrs } = useField<string>("email");
const { value: password, ...passwordAttrs } = useField<string>("password");

watchEffect(() => {
  if (isAuthenticated) {
    router.push("/dashboard");
  }
});

const onSubmit = async (data: LoginFormData) => {
  isLoading.value = true;
  try {
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success("Login successful! Welcome back.");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "Login failed. Please try again.");
    }
  } catch (err) {
    toast.error("An unexpected error occurred. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>
