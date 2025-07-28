#!/bin/bash

echo "Iniciando..."

kubectl apply -f namespace.yaml

kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

kubectl apply -f postgres-pv.yaml

kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

echo "⏳ Waiting for PostgreSQL to be ready..."
kubectl wait --for=condition=ready pod -l app=fiap-pos-tech-db -n fiap-pos-tech --timeout=300s

kubectl apply -f api-deployment.yaml
kubectl apply -f api-service.yaml

kubectl apply -f hpa.yaml

echo "Finalizado!"