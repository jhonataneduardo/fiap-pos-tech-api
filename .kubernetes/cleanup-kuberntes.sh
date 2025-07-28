#!/bin/bash

echo "Iniciando..."

kubectl delete -f hpa.yaml --ignore-not-found=true
kubectl delete -f ingress.yaml --ignore-not-found=true
kubectl delete -f api-service.yaml --ignore-not-found=true
kubectl delete -f api-deployment.yaml --ignore-not-found=true
kubectl delete -f postgres-service.yaml --ignore-not-found=true
kubectl delete -f postgres-deployment.yaml --ignore-not-found=true
kubectl delete -f postgres-pv.yaml --ignore-not-found=true
kubectl delete -f secret.yaml --ignore-not-found=true
kubectl delete -f configmap.yaml --ignore-not-found=true
kubectl delete -f namespace.yaml --ignore-not-found=true

echo "Finalizado!"