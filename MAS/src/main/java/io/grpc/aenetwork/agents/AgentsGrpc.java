package io.grpc.aenetwork.agents;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.40.1)",
    comments = "Source: agents.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class AgentsGrpc {

  private AgentsGrpc() {}

  public static final String SERVICE_NAME = "Agents";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest,
      io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> getCreateAgentsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CreateAgents",
      requestType = io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest.class,
      responseType = io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest,
      io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> getCreateAgentsMethod() {
    io.grpc.MethodDescriptor<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest, io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> getCreateAgentsMethod;
    if ((getCreateAgentsMethod = AgentsGrpc.getCreateAgentsMethod) == null) {
      synchronized (AgentsGrpc.class) {
        if ((getCreateAgentsMethod = AgentsGrpc.getCreateAgentsMethod) == null) {
          AgentsGrpc.getCreateAgentsMethod = getCreateAgentsMethod =
              io.grpc.MethodDescriptor.<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest, io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CreateAgents"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AgentsMethodDescriptorSupplier("CreateAgents"))
              .build();
        }
      }
    }
    return getCreateAgentsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AgentsStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AgentsStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AgentsStub>() {
        @java.lang.Override
        public AgentsStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AgentsStub(channel, callOptions);
        }
      };
    return AgentsStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AgentsBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AgentsBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AgentsBlockingStub>() {
        @java.lang.Override
        public AgentsBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AgentsBlockingStub(channel, callOptions);
        }
      };
    return AgentsBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AgentsFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AgentsFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AgentsFutureStub>() {
        @java.lang.Override
        public AgentsFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AgentsFutureStub(channel, callOptions);
        }
      };
    return AgentsFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class AgentsImplBase implements io.grpc.BindableService {

    /**
     */
    public void createAgents(io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest request,
        io.grpc.stub.StreamObserver<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCreateAgentsMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getCreateAgentsMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest,
                io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse>(
                  this, METHODID_CREATE_AGENTS)))
          .build();
    }
  }

  /**
   */
  public static final class AgentsStub extends io.grpc.stub.AbstractAsyncStub<AgentsStub> {
    private AgentsStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AgentsStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AgentsStub(channel, callOptions);
    }

    /**
     */
    public void createAgents(io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest request,
        io.grpc.stub.StreamObserver<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCreateAgentsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class AgentsBlockingStub extends io.grpc.stub.AbstractBlockingStub<AgentsBlockingStub> {
    private AgentsBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AgentsBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AgentsBlockingStub(channel, callOptions);
    }

    /**
     */
    public io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse createAgents(io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCreateAgentsMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class AgentsFutureStub extends io.grpc.stub.AbstractFutureStub<AgentsFutureStub> {
    private AgentsFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AgentsFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AgentsFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse> createAgents(
        io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCreateAgentsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_CREATE_AGENTS = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AgentsImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(AgentsImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_CREATE_AGENTS:
          serviceImpl.createAgents((io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsRequest) request,
              (io.grpc.stub.StreamObserver<io.grpc.aenetwork.agents.AgentsOuterClass.CreateAgentsResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class AgentsBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AgentsBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return io.grpc.aenetwork.agents.AgentsOuterClass.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Agents");
    }
  }

  private static final class AgentsFileDescriptorSupplier
      extends AgentsBaseDescriptorSupplier {
    AgentsFileDescriptorSupplier() {}
  }

  private static final class AgentsMethodDescriptorSupplier
      extends AgentsBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    AgentsMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (AgentsGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AgentsFileDescriptorSupplier())
              .addMethod(getCreateAgentsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
