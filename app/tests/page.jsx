"use client";
import Link from "next/link";
import testsService from "../../components/services/testsService";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loadiing from "@/components/loading";
import EmailCodeInput from "@/components/emailCodeInput";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const Tests = ({}) => {
  const {
    data: tests,
    error: testsError,
    isLoading: testsLoading,
  } = testsService.useGetTests();

  if (testsLoading) return <Loadiing></Loadiing>;
  if (testsError) return <p>Error: {testsError.message}</p>;

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <main>
        <h1 className="text-4xl sm:text-4xl font-extrabold text-center mt-4 mb-8">
          Тесты
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tests.map((item, index) => (
            <div key={item.id}>
              <Card className="">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-left">
                  {item.sorting && item.sorting.name ? (
                    <Link
                      href={`/${item.sorting.name}`}
                      className="mt-2 mb-1 text-xs font-semibold text-gray-500 hover:underline"
                    >
                      #{item.sorting.displayName}
                    </Link>
                  ) : (
                    item.sorting && (
                      <div className="mt-2 mb-1 text-xs font-semibold text-gray-500">
                        #{item.sorting.displayName}
                      </div>
                    )
                  )}
                </CardContent>
                <Button type="submit" className="mx-auto">
                  Пройти тест
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </main>
      <Link href="/tests/create">
        <button>Перейти на страницу Tests</button>
      </Link>
    </div>
  );
};

export default Tests;
